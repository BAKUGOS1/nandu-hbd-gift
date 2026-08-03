declare module 'page-flip' {
  export class PageFlip {
    constructor(element: HTMLElement, setting: any);
    loadFromHTML(items: NodeListOf<HTMLElement> | HTMLElement[] | any): void;
    flipNext(corner?: string): void;
    flipPrev(corner?: string): void;
    flip(pageIndex: number, corner?: string): void;
    destroy(): void;
    on(event: string, callback: (e: any) => void): void;
    off(event: string, callback: (e: any) => void): void;
    getCurrentPageIndex(): number;
    getPageCount(): number;
  }
}
