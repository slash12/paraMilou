import { useEffect } from "react";
import { Box, Heading, Text, VStack } from "@chakra-ui/react";

type ToolPageProps = {
  title: string;
  description: string;
  widgetId: string;
};

export default function AiWidget({
  title,
  description,
  widgetId,
}: ToolPageProps) {
  const widgetAiLibUrl = import.meta.env.VITE_CLEVERAI_LIB_URL;

  useEffect(() => {
    const existingScript = document.querySelector(
      'script[src="' + { widgetAiLibUrl } + '"]',
    );

    if (existingScript) return;

    const script = document.createElement("script");
    script.src = widgetAiLibUrl;
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <Box maxW="5xl" mx="auto" p={{ base: 4, md: 8 }}>
      <VStack align="stretch" gap={5}>
        <Box>
          <Heading size="lg">{title}</Heading>
          <Text mt={2} color="gray.600">
            {description}
          </Text>
        </Box>

        <div data-clever-widget={widgetId} data-theme="auto" />
      </VStack>
    </Box>
  );
}
