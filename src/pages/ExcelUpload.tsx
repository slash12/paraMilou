import { useState } from "react";
import {
  Box,
  FileUpload,
  Flex,
  Heading,
  HStack,
  IconButton,
  SimpleGrid,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip as ChartTooltip,
  XAxis,
  YAxis,
} from "recharts";
import * as XLSX from "xlsx";

type SpreadsheetRow = {
  Month?: string;
  Visitors?: number | string;
  Signups?: number | string;
};

type ChartRow = {
  month: string;
  visitors: number;
  signups: number;
};

const PIE_COLORS = ["#805AD5", "#319795"];

export default function StatisticsPage() {
  const [fileName, setFileName] = useState("");
  const [chartData, setChartData] = useState<ChartRow[]>([]);
  const [error, setError] = useState("");

  async function handleFileAccept(files: File[]) {
    const file = files[0];
    if (!file) return;

    setFileName(file.name);
    setChartData([]);
    setError("");

    try {
      const buffer = await file.arrayBuffer();
      const workbook = XLSX.read(buffer);
      const firstSheetName = workbook.SheetNames[0];

      if (!firstSheetName) {
        throw new Error("The workbook has no worksheets.");
      }

      const worksheet = workbook.Sheets[firstSheetName];
      const rows = XLSX.utils.sheet_to_json<SpreadsheetRow>(worksheet);

      const parsedData = rows
        .filter((row) => row.Month)
        .map((row) => ({
          month: String(row.Month),
          visitors: Number(row.Visitors) || 0,
          signups: Number(row.Signups) || 0,
        }));

      if (parsedData.length === 0) {
        throw new Error("No rows with a Month value were found.");
      }

      setChartData(parsedData);
    } catch {
      setFileName("");
      setChartData([]);
      setError(
        "Could not read chart data. Check that the first worksheet has Month, Visitors, and Signups columns.",
      );
    }
  }

  const hasChart = chartData.length > 0;

  const totals = chartData.reduce(
    (result, row) => ({
      visitors: result.visitors + row.visitors,
      signups: result.signups + row.signups,
    }),
    { visitors: 0, signups: 0 },
  );

  const summaryData = [
    { name: "Visitors", value: totals.visitors },
    { name: "Signups", value: totals.signups },
  ];

  return (
    <Box w="full" minW="0" p={{ base: 4, md: 8 }}>
      <VStack align="stretch" gap={6}>
        <FileUpload.Root
          accept={[".xlsx", ".xls"]}
          maxFiles={1}
          onFileAccept={({ files }) => {
            void handleFileAccept(files);
          }}
        >
          <FileUpload.HiddenInput />

          <Flex
            align="center"
            justify="space-between"
            flexWrap="wrap"
            gap={3}
          >
            <Heading size="lg">Statistics dashboard</Heading>

            {hasChart && (
              <HStack gap={2}>
                <Text color="gray.500" fontSize="sm">
                  Data from {fileName}
                </Text>

                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <FileUpload.Trigger asChild>
                      <IconButton
                        aria-label="Replace Excel file"
                        size="sm"
                        variant="ghost"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <path d="M21 12a9 9 0 0 1-15.36 6.36" />
                          <path d="M3 12a9 9 0 0 1 15.36-6.36" />
                          <path d="M3 18v-5h5" />
                          <path d="M21 6v5h-5" />
                        </svg>
                      </IconButton>
                    </FileUpload.Trigger>
                  </Tooltip.Trigger>
                  <Tooltip.Positioner>
                    <Tooltip.Content>Replace Excel file</Tooltip.Content>
                  </Tooltip.Positioner>
                </Tooltip.Root>
              </HStack>
            )}
          </Flex>

          {!hasChart && (
            <VStack align="stretch" gap={3} mt={6}>
              <Text color="gray.600" fontSize="sm">
                Upload an Excel file with Month, Visitors, and Signups columns.
                The data is read in your browser and is not saved.
              </Text>

              <FileUpload.Dropzone
                borderWidth="2px"
                borderStyle="dashed"
                borderColor="purple.300"
                borderRadius="xl"
                bg="white"
                p={8}
              >
                <FileUpload.DropzoneContent>
                  <Text fontWeight="semibold">Drop your Excel file here</Text>
                  <Text fontSize="sm" color="gray.600">
                    or click to browse your device
                  </Text>
                </FileUpload.DropzoneContent>
              </FileUpload.Dropzone>
            </VStack>
          )}

          {error && (
            <Text mt={4} color="red.600" fontSize="sm">
              {error}
            </Text>
          )}
        </FileUpload.Root>

        {hasChart && (
          <>
            <SimpleGrid columns={{ base: 1, lg: 2 }} gap={6} w="full">
              <Box
                minW="0"
                p={{ base: 4, md: 5 }}
                borderWidth="1px"
                borderColor="gray.200"
                borderRadius="xl"
                bg="white"
                boxShadow="sm"
              >
                <Heading size="md" mb={1}>
                  Visitors and signups
                </Heading>
                <Text color="gray.500" fontSize="sm" mb={4}>
                  Monthly comparison
                </Text>

                <Box w="full" h={{ base: "280px", md: "340px" }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={chartData}
                      margin={{ top: 8, right: 12, left: 0, bottom: 8 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="visitors"
                        name="Visitors"
                        stroke="#805AD5"
                        strokeWidth={3}
                        dot={{ r: 4 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="signups"
                        name="Signups"
                        stroke="#319795"
                        strokeWidth={3}
                        dot={{ r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </Box>
              </Box>

              <Box
                minW="0"
                p={{ base: 4, md: 5 }}
                borderWidth="1px"
                borderColor="gray.200"
                borderRadius="xl"
                bg="white"
                boxShadow="sm"
              >
                <Heading size="md" mb={1}>
                  Total activity
                </Heading>
                <Text color="gray.500" fontSize="sm" mb={4}>
                  Visitors compared with signups
                </Text>

                <Box w="full" h={{ base: "280px", md: "340px" }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={summaryData}
                      margin={{ top: 8, right: 12, left: 0, bottom: 8 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <ChartTooltip />
                      <Bar dataKey="value" name="Total" radius={[6, 6, 0, 0]}>
                        {summaryData.map((entry, index) => (
                          <Cell
                            key={entry.name}
                            fill={PIE_COLORS[index % PIE_COLORS.length]}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </Box>
              </Box>
            </SimpleGrid>

            <Box
              minW="0"
              p={{ base: 4, md: 5 }}
              borderWidth="1px"
              borderColor="gray.200"
              borderRadius="xl"
              bg="white"
              boxShadow="sm"
            >
              <Heading size="md" mb={1}>
                Activity mix
              </Heading>
              <Text color="gray.500" fontSize="sm" mb={4}>
                Share of total visitors and signups
              </Text>

              <Box w="full" h="300px">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={summaryData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius="75%"
                      label
                    >
                      {summaryData.map((entry, index) => (
                        <Cell
                          key={entry.name}
                          fill={PIE_COLORS[index % PIE_COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <ChartTooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </Box>
          </>
        )}
      </VStack>
    </Box>
  );
}