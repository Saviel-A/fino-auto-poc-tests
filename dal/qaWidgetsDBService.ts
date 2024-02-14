import { QaWidgetsDB } from '../../fino-databases/packages/qaWidgets/src/db/index';
import { logger } from '@finonex-rnd/fino-logger';
import { catchAsync } from '../utils/errorHandler';

export class QaWidgetsDBService {
    private qaWidgetsDB: QaWidgetsDB;

    constructor() {
        this.qaWidgetsDB = new QaWidgetsDB();
    }

    async getAllWidgetsFromDatabase() {
        await catchAsync(async () => {
            const databaseConnection = await this.qaWidgetsDB.initializeDatabase();
            const widgets = await databaseConnection.links.findMany();

            this.logWidgetInfo(widgets);

            logger.info('Query widgets test passed.');
            await this.qaWidgetsDB.disconnect();
        });
    }

    private logWidgetInfo(widgets: any[]) {
        const widgetNames = new Set<string>();

        widgets.forEach((widget) => {
            widgetNames.add(widget.WidgetName);
        });

        const widgetCount = widgetNames.size;
        logger.info(`Found ${widgetCount} widgets`);

        widgetNames.forEach((widgetName) => {
            logger.info(`Widget name: ${widgetName}`);
        });
    }


}
