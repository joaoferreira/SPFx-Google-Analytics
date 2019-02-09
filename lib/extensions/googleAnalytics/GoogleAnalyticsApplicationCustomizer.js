var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import { BaseApplicationCustomizer } from '@microsoft/sp-application-base';
import * as strings from 'GoogleAnalyticsApplicationCustomizerStrings';
var LOG_SOURCE = 'AnalyticsApplicationCustomizer';
var currentURL = document.location.href;
var previousURL = "";
/** A Custom Action which can be run during execution of a Client Side Application */
var GoogleAnalyticsApplicationCustomizer = (function (_super) {
    __extends(GoogleAnalyticsApplicationCustomizer, _super);
    function GoogleAnalyticsApplicationCustomizer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.currentPage = "";
        _this.isInitialLoad = true;
        return _this;
    }
    GoogleAnalyticsApplicationCustomizer.prototype.getFreshCurrentPage = function () {
        return window.location.pathname + window.location.search;
    };
    GoogleAnalyticsApplicationCustomizer.prototype.updateCurrentPage = function () {
        this.currentPage = this.getFreshCurrentPage();
    };
    GoogleAnalyticsApplicationCustomizer.prototype.navigatedEvent = function () {
        var trackingID = this.properties.trackingID;
        if (!trackingID) {
            Log.info(LOG_SOURCE, "" + strings.MissingID);
        }
        else {
            var navigatedPage = this.getFreshCurrentPage();
            if (this.isInitialLoad) {
                this.realInitialNavigatedEvent(trackingID);
                this.updateCurrentPage();
                this.isInitialLoad = false;
            }
            else if (!this.isInitialLoad && (navigatedPage !== this.currentPage)) {
                this.realNavigatedEvent(trackingID);
                this.updateCurrentPage();
            }
        }
    };
    GoogleAnalyticsApplicationCustomizer.prototype.realInitialNavigatedEvent = function (trackingID) {
        console.log("Tracking full page load...");
        var gtagScript = document.createElement("script");
        gtagScript.type = "text/javascript";
        gtagScript.src = "https://www.googletagmanager.com/gtag/js?id=" + trackingID;
        gtagScript.async = true;
        document.head.appendChild(gtagScript);
        eval("\n          window.dataLayer = window.dataLayer || [];\n          function gtag(){dataLayer.push(arguments);}\n          gtag('js', new Date());\n          gtag('config',  '" + trackingID + "');\n        ");
    };
    GoogleAnalyticsApplicationCustomizer.prototype.realNavigatedEvent = function (trackingID) {
        console.log("Tracking partial page load...");
        eval("\n        if(ga) {\n          ga('create', '" + trackingID + "', 'auto');\n          ga('set', 'page', '" + this.getFreshCurrentPage() + "');\n          ga('send', 'pageview');\n        }\n        ");
    };
    GoogleAnalyticsApplicationCustomizer.prototype.onInit = function () {
        this.context.application.navigatedEvent.add(this, this.navigatedEvent);
        return Promise.resolve();
    };
    __decorate([
        override
    ], GoogleAnalyticsApplicationCustomizer.prototype, "onInit", null);
    return GoogleAnalyticsApplicationCustomizer;
}(BaseApplicationCustomizer));
export default GoogleAnalyticsApplicationCustomizer;
//# sourceMappingURL=GoogleAnalyticsApplicationCustomizer.js.map