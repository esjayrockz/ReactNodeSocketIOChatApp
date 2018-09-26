//Configuring Enzyme
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import DotEnv from 'dotenv';

Enzyme.configure({
  adapter: new Adapter()
});

DotEnv.config({ path: '.env.test' }); // This will read the environment variables from the .env.test file
