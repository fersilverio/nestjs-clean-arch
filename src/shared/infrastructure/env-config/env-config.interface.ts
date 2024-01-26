// Interface that contains methods to be implemented for config handling
export interface EnvConfig {
  getAppPort(): number;
  getNodeEnv(): string;
}
