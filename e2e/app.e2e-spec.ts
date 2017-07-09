import { Project2Page } from './app.po';

describe('project2 App', () => {
  let page: Project2Page;

  beforeEach(() => {
    page = new Project2Page();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
