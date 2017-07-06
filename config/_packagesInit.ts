
import {_serverStartup as s1} from "../app/platform-core/_serverStartup";
import {_serverStartup as s2} from "../app/platform-admin/_serverStartup";
import {_serverStartup as s3} from "../app/buhta3-import/_serverStartup";

export async function _packagesInit(){
    await s1();
    await s2();
    await s3();
}