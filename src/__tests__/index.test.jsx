import { beforeAll, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import Products from '../components/Products';
import fs from 'fs';
import path from 'path';
import App from '../App';

beforeAll(() => {
  render(<App />);
});

const product = fs
  .readFileSync(path.resolve(__dirname, '../components/Product.jsx'), 'utf8')
  .replaceAll(/(?:\r\n|\r|\n| )/g, '');

test('Products sayfasında styled-components import edilmiş.', () => {
  expect(product.includes('importstyledfrom')).toBe(true);
});

test('Products sayfasında styled-component olarak ProductCard oluşturulmuş ve kullanılmış.', () => {
  expect(product.includes('constProductCard')).toBe(true);
  expect(product.includes('<ProductCard>')).toBe(true);
  expect(product.includes('</ProductCard>')).toBe(true);
});

test('Styled-component olarak Category oluşturulmuş ve kullanılmış.', () => {
  expect(product.includes('constCategory')).toBe(true);
  expect(product.includes('<Category>')).toBe(true);
  expect(product.includes('</Category>')).toBe(true);
});

test('Styled-component olarak Image oluşturulmuş ve kullanılmış.', () => {
  expect(product.includes('constImage')).toBe(true);
  expect(product.includes('<Imagesrc')).toBe(true);
});

test('Styled-component olarak PriceTag oluşturulmuş ve kullanılmış.', () => {
  expect(product.includes('constPriceTag')).toBe(true);
  expect(product.includes('<PriceTag')).toBe(true);
  expect(product.includes('</PriceTag>')).toBe(true);
});

test("PriceTag'a ürün kategorisi category prop'u ile iletilmiş", () => {
  expect(product.includes('constPriceTag')).toBe(true);
  expect(product.includes('<PriceTagcategory')).toBe(true);
});

test("PriceTag'da category prop'una göre renk dinamik olarak ayarlanmış", () => {
  const part = product
    .split("constPriceTag")[1]
    .split("exportdefaultfunction")[0];
  expect(part.includes("props.category")).toBe(true);
});

test("PriceTag'da hover eklenmiş", () => {
  const part = product
    .split('constPriceTag')[1]
    .split('exportdefaultfunction')[0];
  expect(part.includes('&:hover{')).toBe(true);
});

test('Styled-component olarak Title oluşturulmuş ve kullanılmış.', () => {
  expect(product.includes('constTitle')).toBe(true);
  expect(product.includes('<Title>')).toBe(true);
  expect(product.includes('</Title>')).toBe(true);
});

test('Styled-component olarak Description oluşturulmuş ve kullanılmış.', () => {
  expect(product.includes('constDescription')).toBe(true);
  expect(product.includes('<Description>')).toBe(true);
  expect(product.includes('</Description>')).toBe(true);
});

test('getClassName fonksiyonu Products componentinden silinmiş', () => {
  expect(product.includes('functiongetClassName()')).not.toBe(true);
});

test("Product.css importu Products componentinden silinmiş", () => {
  expect(product.includes('./Product.css')).not.toBe(true);
});

test('Product componenti styled-components ile doğru şekilde render oluyor.', () => {
  render(<Products />);
  expect(product.includes('styled.div')).toBe(true);
  expect(screen.getAllByText("men's clothing")).toHaveLength(4);
  expect(screen.getAllByText('jewelery')).toHaveLength(4);
  expect(screen.getAllByText('electronics')).toHaveLength(6);
  expect(screen.getAllByText("women's clothing")).toHaveLength(6);
});

test('Styled componentler Products component fonksiyonun dışında tanımlanmış.', () => {
  const part = product.split('exportdefaultfunction');
  expect(part[0].includes('=styled.')).toBe(true);
  expect(part[1].includes('=styled.')).not.toBe(true);
});
