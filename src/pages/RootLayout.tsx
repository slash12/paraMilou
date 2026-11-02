import { Outlet }  from 'react-router-dom'
import Sidebar from '@/components/Sidebar'
import { Grid, GridItem} from '@chakra-ui/react'

export default function RootLayout() {
    return (
        <Grid 
            templateColumns="220px 1fr"
            bg="gray.50"
             columnGap={4}
        >
            <Sidebar />
            <GridItem>
                <Outlet />
            </GridItem>
        </Grid>
    )
}