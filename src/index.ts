import {Searcher} from "./Searcher"
import { LunrSearcher } from "./LunrSearcherType";
import { FuseSearcher } from "./FuseSearcherType";
import text from "./text.json"

const searcher = new Searcher(text);
const fuseSearcher = new FuseSearcher();
const fuseResult = searcher.search("ekbwf", fuseSearcher);

const lunrSearcher = new LunrSearcher();
const lunrResult = searcher.search("ekbwf", lunrSearcher);

console.log(fuseResult);
console.log(lunrResult);