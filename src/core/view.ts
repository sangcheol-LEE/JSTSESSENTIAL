export abstract class View {
  private template: string;
  private renderTemplate: string;
  private root: HTMLElement;
  private htmlList: string[];

  constructor(rootId: string, template: string) {
    const root = document.getElementById(rootId);
    if (!root) {
      throw new Error(
        "최상위 컨테이너가 null입니다. html 및 id를 확인해주세요"
      );
    }
    this.root = root;
    this.template = template;
    this.renderTemplate = template;
    this.htmlList = [];
  }

  protected addHtml(htmlString: string): void {
    this.htmlList.push(htmlString);
  }

  protected getHtml(): string {
    const snapshot = this.htmlList.join("");
    this.clearHtml();
    return snapshot;
  }

  protected setTemplateData(key: string, value: string): void {
    this.renderTemplate = this.renderTemplate.replace(`{{_${key}_}}`, value);
  }

  protected updateView = (): void => {
    this.root.innerHTML = this.renderTemplate;
    this.renderTemplate = this.template;
  };

  private clearHtml(): void {
    this.htmlList = [];
  }
  abstract render(): void; // 추상메소드
}
