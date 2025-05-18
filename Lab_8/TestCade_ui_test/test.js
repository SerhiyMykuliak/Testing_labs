import testcafe, { Selector } from 'testcafe';

fixture('Cyberpunk 2077 home page tests')
  .page('https://www.cyberpunk.net/us/en/')

  test('Should display Cyberpunk 2077 logo and have correct scr', async t => {
    const logo = Selector('.header-top__logo-black');
    await t.expect(logo.exists).ok()

    const logoSrc = logo.getAttribute('src')
    await t.expect(logoSrc).eql('https://www.cyberpunk.net/build/images/home8/logo-franchise-black-en@1x-567991b0.png');
  });

  test('Should display header menu', async t => {
    const menuHeader = Selector('.menu');
    await t.expect(menuHeader.exists).ok()
  });

  test('Menu should have items', async t => {
    const menuItems = Selector('.menu-item');
    const menuItemsCount = menuItems.count

    for(let i = 0; i < menuItemsCount; i++){
      const element = menuItems.nth(i);
      await t.expect(element.exists).ok()
    }
  });

  test('Should display title', async t => {
    const title = Selector('h1');
    await t.expect(title.innerText).eql("GET THE ULTIMATE CYBERPUNK 2077 EXPERIENCE")
  });

