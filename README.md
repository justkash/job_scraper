#Job Scraper

## Starting
Create the Docker image using the following command.
```bash
docker image build -t clasp:1.0 .
```
Run the container using the following command.
```bash
docker run -it --rm --name job_scraper --mount type=bind,source="$(pwd)",target=/usr/src/app clasp:1.0
```
