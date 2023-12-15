import {Searcher, FuseSearcher} from "./Searcher"
import text from "./text.json"

const searcher = new Searcher(text);
const fuseSearcher = new FuseSearcher();
const result = searcher.search("ekbwf", fuseSearcher);

console.log(result);