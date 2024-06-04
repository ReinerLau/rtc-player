FROM node:lts

COPY .output /app/.output
COPY utils/db /app/utils/db 
COPY drizzle.config.ts /app/drizzle.config.ts 

WORKDIR /app

RUN npm install drizzle-orm -D
RUN npm install drizzle-kit -D
RUN npm install better-sqlite3 -D
RUN npx drizzle-kit push

WORKDIR /app/.output/server

RUN npm install

WORKDIR /app

CMD node .output/server/index.mjs


EXPOSE 3000