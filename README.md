# Nextjs + Handle fresh token, custom map, and build docker

## Getting Started

First, run the development server:

```bash
# Install package
npm install or yarn

# install husky
npm run prepare

# Run
npm run dev or yarn dev
```

## Library Docs

```md
1. Framework Nextjs: https://nextjs.org/

2. State management Reactjs: https://recoiljs.org/ Or https://jotai.org/

3. Library for request api: https://www.npmjs.com/package/umi-request

4. Library Multiple Language: https://www.npmjs.com/package/next-i18next

5. Library Hooks popular: https://ahooks.js.org/

6. Library dayjs: https://day.js.org/

7. Processing CSS: https://sass-lang.com/guide
```

## Tài liệu

## NextJS Multilingual Project

1. Cài đặt
   npm install or yarn add next-i18next

2. Tạo folder

```bash
|__ public
    |__ locales
        |__en
            |__common.json
        |__vi
            |__common.json
```

3. Nếu muốn sửa đổi folder theo cách của bạn thì phải cấu hình lại localePath trong next18 config dưới đây.

4. Tạo file next-i18next.config.js trong thư mục gốc

```bash
const path = require('path');

module.exports = {
  i18n: {
    defaultLocale: 'vi',
    locales: ['vi', 'en']
  },
  reloadOnPrerender: process.env.NODE_ENV === 'development',
  localePath: path.resolve('./public/locales'),
  fallbackLng: ['vi'],
}

```

- defaultLocale: Mặc định chạy ngôn ngữ đó khi lần đầu chạy ứng dụng lên

5. Tiếp thep tạo file next.config.js: đưa i18n vào tệp này để **enable localised URL routing**.

```bash
  const { i18n } = require('./next-i18next.config')

  module.exports = {
    i18n,
  }
```

6. Cách dùng

- Đưa các tên đã tạo trong locales vào trong các pages thông qua **getStaticProps** or **getServerSideProps**

```bash

  import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

  export async function getStaticProps({ locale }) {
    return {
      props: {
        ...(await serverSideTranslations(locale, [
          'common'
        ])),
        // Will be passed to the page component as props
      },
    }
  }

```

## Handle Token refresh token

## Docker build

## Google maps (Draw a circle with a radius of 50km around that location)

```md

```

## CI/CD
