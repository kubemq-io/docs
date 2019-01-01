FROM alpine:latest
ADD ./docs/.vuepress/dist .
ADD caddy .
ADD Caddyfile .
EXPOSE 80 443 2015
CMD ["./caddy"]

