/**
 * Dialog Default Translations.
 *
 * Include this module if you're not already using angular-translate in your application, and
 * add it to your application module's dependency list in order to get default header and 
 * dialog messages to appear.
 * 
 * Ex: var myApp = angular.module('myApplication',['dialogs.main','dialogs.default-translations']);
 *
 * It was necessary to separate this out for those already using angular-translate because this would
 * automatically reset their translation list for 'en-US'
 *
 * For those already using angular-translate, just copy the list of DIALOG_[..] translations to your
 * translation list where you set 'en-US' using the $translateProvider.
 */

//== Translations =============================================================//

 angular.module('dialogs.default-translations',['pascalprecht.translate'])
 /**
     * Default translations in English.
     * 
     * Use angular-translate's $translateProvider to provide translations in an
     * alternate language.
     *
     * $translateProvider.translations('[lang]',{[translations]});
     * To use alternate translations set the preferred language to your desired
     * language.
     * $translateProvider.preferredLanguage('[lang]');
     */
    .config(['$translateProvider',function($translateProvider){
        $translateProvider.translations('sv-SE',{
            DIALOGS_ERROR: "Fel",
            DIALOGS_ERROR_MSG: "Ett okänt fel har uppstått.",
            DIALOGS_CLOSE: "Stäng",
            DIALOGS_PLEASE_WAIT: "Var god vänta",
            DIALOGS_PLEASE_WAIT_ELIPS: "Var god vänta...",
            DIALOGS_PLEASE_WAIT_MSG: "Väntar på att åtgärden skall bli färdig.",
            DIALOGS_PERCENT_COMPLETE: "% Färdig",
            DIALOGS_NOTIFICATION: "Meddelande",
            DIALOGS_NOTIFICATION_MSG: "Okänt applikationsmeddelande.",
            DIALOGS_CONFIRMATION: "Bekräftelse",
            DIALOGS_CONFIRMATION_MSG: "Bekräfta åtgärden.",
            DIALOGS_OK: "OK",
            DIALOGS_YES: "Ja",
            DIALOGS_NO: "Nej"
        });

        $translateProvider.preferredLanguage('sv-SE');
    }]); // end config