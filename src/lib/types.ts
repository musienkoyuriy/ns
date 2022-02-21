export interface ChildProcessData {
    command: string;
    args: string[];
    envVars: { [key: string]: string };
};