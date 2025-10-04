# Use an official nginx image as the base
FROM nginx:alpine

# Copy static site files to nginx html directory
COPY . /usr/share/nginx/html

# Remove default nginx config and use a minimal one
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
