import {MenuTemplate} from "./components/MenuTemplate";
export class AppState {

    // ------------------ pageTemplates ------------------
    pageTemplates: { [pageTemplateId: string]: Function; } = {};

    registerPageTemplate(pageTemplateClass: Function) {
        if (!(pageTemplateClass as any).pageTemplateId) {
            let err = "registerPageTemplate(): неверный класс шаблона страницы";
            console.error(err);
            throw err;
        }
        else
            this.pageTemplates[(pageTemplateClass as any).pageTemplateId] = pageTemplateClass;
    }

    getRegisteredPageTemplate(pageTemplateId: string): Function {
        let pageClass = this.pageTemplates[pageTemplateId];
        if (!pageClass) {
            let err = "registerPageTemplate(): не найден зарегистрированный шаблон страницы " + pageTemplateId;
            console.error(err);
            throw err;
        }
        else
            return pageClass;
    }

    // ------------------ menuTemplates ------------------
    menuTemplates: { [menuTemplateId: string]: Function; } = {};

    registerMenuTemplate(menuTemplateClass: Function) {
        if (!(menuTemplateClass as any).menuTemplateId) {
            let err = "registerMenuTemplate(): неверный класс шаблона меню";
            console.error(err);
            throw err;
        }
        else
            this.menuTemplates[(menuTemplateClass as any).menuTemplateId] = menuTemplateClass;
    }

    getRegisteredMenuTemplate(menuTemplateId: string): Function {
        let pageClass = this.menuTemplates[menuTemplateId];
        if (!pageClass) {
            let err = "registerMenuTemplate(): не найден зарегистрированный шаблон страницы " + menuTemplateId;
            console.error(err);
            throw err;
        }
        else
            return pageClass;
    }

    // ------------------ actions ------------------
    actions: { [actionId: string]: Function; } = {};

    registerAction(actionClass: Function) {
        if (!(actionClass as any).actionId) {
            let err = "registerAction(): неверный класс action";
            console.error(err);
            throw err;
        }
        else
            this.actions[(actionClass as any).actionId] = actionClass;
    }

    getRegisteredAction(actionId: string): Function {
        let actionClass = this.actions[actionId];
        if (!actionClass) {
            let err = "registerAction(): не найден зарегистрированный action " + actionId;
            console.error(err);
            throw err;
        }
        else
            return actionClass;
    }
}

export const appState = new AppState();
