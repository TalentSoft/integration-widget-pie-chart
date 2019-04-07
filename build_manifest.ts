import {writeFile} from 'fs';
import { hostmock } from './mock/host-mock'

const manifest = {
  configuration : hostmock.configuration
}


writeFile("./dist/manifest.json", JSON.stringify(manifest, null, 4), (err) => {
  if (err) {
      console.error(err);
      return;
  };
  console.log("manifest has been created");
});
