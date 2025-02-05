import { Text, Button, Flex } from '@radix-ui/themes';
import './App.css';
import '@radix-ui/themes/styles.css';

function App() {
  return (
    <>
      <Flex direction="column" gap="2">
        <Text>Hello from Radix Themes :</Text>
        <Button>{`Let's go`}</Button>
      </Flex>
    </>
  );
}

export default App;
