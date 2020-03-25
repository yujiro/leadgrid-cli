declare class Server {
    private routes;
    private staticRoutes;
    constructor();
    route(url: string, html: string): void;
    staticRoute(url: string, staticDirPath: string): void;
    start(port: number): void;
}
export default Server;
