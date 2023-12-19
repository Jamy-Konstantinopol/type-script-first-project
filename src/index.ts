import {Searcher} from "./Searcher"
import { FuseSearcher } from "./FuseSearcher";
import text from "./text.json"
import { UrlConverter } from "./UrlConverter";

const searcher = new Searcher();
const fuseSearcher = new FuseSearcher(text);
const fuseResult = searcher.search("ulitsa", fuseSearcher);

console.log(fuseResult);

let urlConverter = new UrlConverter();
let result = urlConverter.convertToUrl("ПРивет, меня ^&)&)(&(&)!@%*&#)зовут");

console.log(result);