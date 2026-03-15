FROM public.ecr.aws/lambda/provided:al2-x86_64

# Install PHP and required extensions
RUN yum update -y && \
    yum install -y https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm && \
    yum install -y https://rpms.remirepo.net/enterprise/remi-release-7.rpm && \
    yum-config-manager --enable remi-php81 && \
    yum install -y php php-json php-mbstring php-openssl php-curl && \
    yum clean all

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Copy application files
COPY . ${LAMBDA_TASK_ROOT}

# Install PHP dependencies
RUN composer install --no-dev --optimize-autoloader

# Set the CMD to your handler
CMD ["login.php"]
