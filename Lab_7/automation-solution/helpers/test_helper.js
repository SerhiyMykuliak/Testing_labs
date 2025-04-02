async function getElementAttribute(page, selector, attributeName) {
  return await page.$eval(selector, (el, attr) => el.getAttribute(attr), attributeName);
}


module.exports = { getElementAttribute };


/*
async function checkImageAttributeValue(page, imgSelector, attributeName, expectedValue) {
  return await page.$eval(imgSelector, (img, attributeName, expectedValue) => {
    const attributeValue = img.getAttribute(attributeName); // Отримуємо значення атрибута
    return attributeValue === expectedValue; // Порівнюємо значення атрибута і повертаємо результат порівняння
  }, attributeName, expectedValue);
}

module.exports = { checkImageAttributeValue };
 */