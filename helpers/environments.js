/*
 * Title: environments
 * Description: environments
 * Author: Md Lihan ( mldevzone )
 * Date: 27/05/2022
 *
 */
// environments object - module scaffolding
const environments = {};
environments.staging = {
  port: 3000,
  envName: "staging",
  secretKey: "#$#$mjfasdaksdas",
};
environments.production = {
  port: 5000,
  envName: "production",
  secretKey: "#$#$mjfasdaasdasfsdfdas",
};
const currentEnvironment =
  typeof process.env.NODE_ENV === "string" ? process.env.NODE_ENV : "staging";

const environmentsToExport = environments[currentEnvironment]
  ? environments[currentEnvironment]
  : environments.staging;
module.exports = environmentsToExport;
