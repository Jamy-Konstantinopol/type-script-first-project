import {Searcher} from "./Searcher"
import { LunrSearcher } from "./LunrSearcher";
import { FuseSearcher } from "./FuseSearcher";
import text from "./text.json"
const searcher = new Searcher();
const fuseSearcher = new FuseSearcher(text);
const fuseResult = searcher.search("ekbwf", fuseSearcher);

const lunrSearcher = new LunrSearcher(text);
const lunrResult = searcher.search("ekbwf", lunrSearcher);

console.log(fuseResult);
console.log(lunrResult);