				import worker, * as OTHER_EXPORTS from "C:\\Users\\harlenfan\\Documents\\projects\\task-calendar\\.wrangler\\tmp\\pages-lytxpa\\functionsWorker-0.9432384781722556.mjs";
				import * as __MIDDLEWARE_0__ from "C:\\software\\nvm\\v16.20.2\\node_modules\\wrangler\\templates\\middleware\\middleware-ensure-req-body-drained.ts";
import * as __MIDDLEWARE_1__ from "C:\\software\\nvm\\v16.20.2\\node_modules\\wrangler\\templates\\middleware\\middleware-miniflare3-json-error.ts";
				
				worker.middleware = [
					__MIDDLEWARE_0__.default,__MIDDLEWARE_1__.default,
					...(worker.middleware ?? []),
				].filter(Boolean);
				
				export * from "C:\\Users\\harlenfan\\Documents\\projects\\task-calendar\\.wrangler\\tmp\\pages-lytxpa\\functionsWorker-0.9432384781722556.mjs";
				export default worker;