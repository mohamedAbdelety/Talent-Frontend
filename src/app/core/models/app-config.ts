export interface AppConfig {
    name: string;
    serverUrl: string;
    scopeUri: string;
    tenantId: string;
    uiClienId: string;
    redirectUrl: string;
    baseUrl: string;
    environment: string;
    cacheLocation: string;
    authority: string;
    protectedResourceMap: any[][];
    extension: string;
}
