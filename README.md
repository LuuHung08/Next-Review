# Nextjs + Handle fresh token, custom map, and build docker

## Link web

Link: https://hunglv.online

## My profile

Link: http://134.209.103.144/

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

- Dùng trong components

```bash

import { useTranslation } from 'next-i18next';
import styles from './index.module.scss';

function Home() {
  const { t } = useTranslation('common');

  // dùng nhiều file json: useTranslation(['common', 'home', ...])

  return (
    <div className={styles.buttonHome}>
      {t('map_title')}
    </div>
  );
}

export default Home;

```

## Handle Token refresh token

1. Tạo constructor có 3 hàm : isTokenValid, getAccessToken, onRefreshToken

- isTokenValid: kiểm tra token đã hết hạn hay chưa
- getAccessToken: lấy token
- onRefreshToken: call api lấy lại token mới thông qua refresh token

2. Luồng hoạt động

- Khi có request private thì sẽ gọi đến hàm getToken

```bash

  const privateRequest = async (request: any, suffixUrl: string, configs?: any) => {
      const token: string = configs?.token
        ? configs?.token
        : ((await TokenManager.getToken()) as string);

      return request(suffixUrl, injectBearer(token, configs));
    };

```

<!-- ![alt](url) -->

- Hàm getToken sẽ check xem token còn hạn hay chưa thông qua event **'refreshDone'** -> lấy token cũ, ngược lại thông qua event **'refresh'**

- event **'refresh'** check dựa vào hàm isTokenValid -> token còn hạn thì lấy token cũ không thì chạy event **'refreshing'** để gọi hàm onRefreshToken lấy token mới về

## Docker build

- Concept: Docker is a way to package software so it can run on any hardware".

1. Cấu trúc

```bash

# Use the official image as a parent image.
FROM node:16-alpine

# Set the working directory.
WORKDIR /app

# Copy the file from your host to your current location.
COPY ./package.json ./


RUN npm install --legacy-peer-deps

# Copy the rest of your app's source code from your host to your image filesystem.
COPY . .

# Run the command inside your image filesystem.
RUN npm run build

# Inform Docker that the container is listening on the specified port at runtime.
EXPOSE 3000

# Run the specified command within the container.
CMD npm start

```

2. Run

- Tạo image mới

```bash

docker build -t name-image .

```

- Run image

```bash

docker run -p 3000:3000 name-image

```

- watch list images

```bash

docker image ls

```

- stop image

```bash

//docker ps -> get container_id

docker stop container_id

```

## Google maps (Draw a circle with a radius of 50km around that location)

1. Cài đặt

```md
yarn add @googlemaps/markerclusterer
```

2. Tạo init map

- Dựng khung map:

```bash

const mapEle = document.getElementById('map') as HTMLAnchorElement;
      map = new google.maps.Map(mapEle, {
        center: currentLocation,
        zoom: 8,
        zoomControl: true,
        scaleControl: true,
        mapTypeControl: false,
        styles: [
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }],
          },
        ],
      });

```

- Tạo marker khi click

```bash

 const pinned = new google.maps.Marker({
        position: currentLocation,
        map: map,
        visible: false,
      });

```

3. Lắng nghe sự kiện click của google khi click vào vị trí bất kỳ
   - Lấy lại lat long và set lại pinned marker mới
   - Tạo 1 hình tròn trên map: dùng **new window.google.maps.Circle** để tạo hình tròn

```bash
    let circle: google.maps.Circle;

    google.maps.event.addListener(map, 'click', function (e: any) {
      // show default marker
      pinned.setPosition(e.latLng);
      pinned.setVisible(true);
      locCustomWindow.open(map, pinned);  //show popup info marker

      if (circle && circle.setMap) circle.setMap(null);
      //Khi muốn tạo hình mới thì sẽ xoá hình cũ đi

      const areaMap: Record<string, City> = {
        vn: {
          center: { lat: e.latLng.lat(), lng: e.latLng.lng() },
          population: 50000, //radius: 1609,3,  1 miles in metres -> 50km = 50000
        },
      };

      const eLat = { lat: parseFloat(e.latLng.lat()), lng: parseFloat(e.latLng.lng()) };
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ location: eLat }, function (results, status) {
        if (results && status == google.maps.GeocoderStatus.OK) {
          locCustomWindow.setContent(locCustomContent(e.latLng, results[1].formatted_address));
        } else {
          locCustomWindow.setContent(locCustomContent(e.latLng, 'Not address'));

          circle = new window.google.maps.Circle({
            strokeColor: '#21a5ff',
            strokeOpacity: 0.5,
            strokeWeight: 2,
            fillColor: '#21a5ff',
            fillOpacity: 0.5,
            map: map,
            center: areaMap['vn'].center,
            radius: areaMap['vn'].population,
          });
        }
      });
    });

```

## CI/CD

![alt](https://www.nginx.com/wp-content/uploads/2020/09/ci-cd-process_entire.png)

[Link cicd with nginx](https://www.nginx.com/blog/introducing-cicd-with-nginx-and-nginx-plus/)

1.  with github actions pm2 from nginx

- Tạo file

```bash

  .github/workflows/main.yml

```

- Cấu trúc file

```bash

  - name: name action

  - on: push branch checkout on server

  - job: các job chạy
    + cancel: Chạy xem có lỗi gì không thông qua token của github
    + deploy:
      __ cần chạy qua job cancel false -> cancel, true -> continue
      __ run-on: chạy qua hệ điều hành: ubuntu-latest
      __ steps:
        Deploy
         host: ip server
         username: default is root
         key: private key machine under local
         port: default port 22
         script: cd to forder -> git pull -> install -> build -> restart instance
        Failure -> noti github action of webhook

    notifification: noti github action of webhook true | false


  //Đặt key public lên trên con server để mỗi lần push code lên git, public key đặt trên server check vs private key trên github xem đúng không
  -> chạy các steps ở job
  <- cancel note err

```

## Run docker on server

```bash

  - sửa code local -> build image with tag new
  - commit tag name on docker hub
  - push name image

  - docker build -t name-iamge .

  - docker run -it -d -p --name name-test 3000:3000 name-image:tag

  - docker commit name-test name-image:tag

  - docker push name-image:tag


  - On server

  - docker pull name-image:tag

  - docker run -d -p --name name-test 3000:3000 name-image:tag


  // Xem forder code on docker image

  docker exec -it name-container sh | bash


```

## Cicd docker and nginx
