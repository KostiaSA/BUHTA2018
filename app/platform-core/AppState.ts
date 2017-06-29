export class AppState {
    pageTemplates: { [pageTemplateName: string]: Function; } = {};

    registerPageTemplate(pageTemplateClass: Function) {
        this.pageTemplates[(pageTemplateClass as any).templateId] = pageTemplateClass;
    }

    getRegisteredPageTemplate(pageTemplateId: string): Function {
        let pageClass = this.pageTemplates[pageTemplateId];
        if (!pageClass)
            throw "не найден зарегистрированный шаблон страницы " + pageTemplateId;
        else
            return pageClass;
    }

}

export const appState = new AppState();
