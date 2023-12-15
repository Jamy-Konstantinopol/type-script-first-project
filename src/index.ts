import {Searcher} from "./Searcher"
import { LunrSearcherType } from "./LunrSearcherType";
import { FuseSearcherType } from "./FuseSearcherType";
import text from "./text.json"

const searcher = new Searcher(text);
const fuseSearcher = new FuseSearcherType();
const fuseResult = searcher.search("ekbwf", fuseSearcher);

const lunrSearcher = new LunrSearcherType();
const lunrResult = searcher.search("ekbwf", lunrSearcher);

console.log(fuseResult);
console.log(lunrResult);