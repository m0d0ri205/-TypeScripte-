import {init} from "myPackage";
import { exit } from "node:process";

//localStorage

init({
    url: "true"
})

exit(1);

localStorage.clear();