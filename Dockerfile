FROM alpine:latest
ADD ./docs/.vuepress/dist .
ADD caddy .
ADD Caddyfile .
RUN chmod +x /caddy
EXPOSE 80 443 2015
CMD ["./caddy"]

