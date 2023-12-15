import {Searcher, FuseSearcherType, LunrSearcherType} from "./Searcher"
import text from "./text.json"

const searcher = new Searcher(text);
const fuseSearcher = new FuseSearcherType();
const fuseResult = searcher.search("ekbwf", fuseSearcher);

const lunrSearcher = new FuseSearcherType();
const lunrResult = searcher.search("ekbwf", lunrSearcher);

console.log(fuseResult);
console.log(lunrResult);