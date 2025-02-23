export interface RPCConfig {
  clientId: string;
  state?: string;
  details?: string;
  largeImageKey?: string;
  largeImageText?: string;
  smallImageKey?: string;
  smallImageText?: string;
  buttons?: Array<{
    label: string;
    url: string;
  }>
}

export interface SavedConfig extends RPCConfig {
  name: string;
  autoStart: boolean;
}