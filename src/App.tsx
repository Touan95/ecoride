import './App.css'
import "@radix-ui/themes/styles.css";
import { Button, Flex, Text } from '@radix-ui/themes';

function App() {

  return (
    <>
      <Flex direction="column" gap="2">
        <Text>Hello from Radix Themes :</Text>
        <Button>Let's go</Button>
		  </Flex>
    </>
  )
}

export default App
