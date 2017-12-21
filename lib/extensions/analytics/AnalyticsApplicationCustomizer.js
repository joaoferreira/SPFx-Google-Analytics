"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var decorators_1 = require("@microsoft/decorators");
var sp_core_library_1 = require("@microsoft/sp-core-library");
var sp_application_base_1 = require("@microsoft/sp-application-base");
var strings = require("AnalyticsApplicationCustomizerStrings");
var LOG_SOURCE = 'AnalyticsApplicationCustomizer';
/** A Custom Action which can be run during execution of a Client Side Application */
var AnalyticsApplicationCustomizer = (function (_super) {
    __extends(AnalyticsApplicationCustomizer, _super);
    function AnalyticsApplicationCustomizer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AnalyticsApplicationCustomizer.prototype.onInit = function () {
        var trackingID = this.properties.trackingID;
        if (!trackingID) {
            sp_core_library_1.Log.info(LOG_SOURCE, "" + strings.MissingID);
        }
        else {
            var gtagScript = document.createElement("script");
            gtagScript.type = "text/javascript";
            gtagScript.src = "https://www.googletagmanager.com/gtag/js?id=" + trackingID;
            gtagScript.async = true;
            document.head.appendChild(gtagScript);
            eval("\n        window.dataLayer = window.dataLayer || [];\n        function gtag(){dataLayer.push(arguments);}\n        gtag('js', new Date());    \n        gtag('config',  '" + trackingID + "');\n      ");
        }
        return Promise.resolve();
    };
    __decorate([
        decorators_1.override
    ], AnalyticsApplicationCustomizer.prototype, "onInit", null);
    return AnalyticsApplicationCustomizer;
}(sp_application_base_1.BaseApplicationCustomizer));
exports.default = AnalyticsApplicationCustomizer;

//# sourceMappingURL=AnalyticsApplicationCustomizer.js.map
