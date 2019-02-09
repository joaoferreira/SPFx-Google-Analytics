import { BaseApplicationCustomizer } from '@microsoft/sp-application-base';
/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IGoogleAnalyticsApplicationCustomizerProperties {
    trackingID: string;
}
/** A Custom Action which can be run during execution of a Client Side Application */
export default class GoogleAnalyticsApplicationCustomizer extends BaseApplicationCustomizer<IGoogleAnalyticsApplicationCustomizerProperties> {
    private currentPage;
    private isInitialLoad;
    private getFreshCurrentPage();
    private updateCurrentPage();
    private navigatedEvent();
    private realInitialNavigatedEvent(trackingID);
    private realNavigatedEvent(trackingID);
    onInit(): Promise<void>;
}
