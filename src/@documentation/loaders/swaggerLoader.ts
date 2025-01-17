import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import {INestApplication} from '@nestjs/common';

export function initDocumentation(
    app: INestApplication,
    initData: IInitDocumentation,
) {
    const options = new DocumentBuilder()
        .setTitle(initData.title)
        .setDescription(initData.description)
        .setVersion(initData.version);

    if (initData.tag && initData.tag.length) {
        initData.tag.forEach(singleTag => {
            options.addTag(singleTag);
        });
    }

    const swaggerOptions = options.build();

    const document = SwaggerModule.createDocument(app, swaggerOptions);
    SwaggerModule.setup(initData.endpoint, app, document);
}

export interface IInitDocumentation {
    endpoint: string;
    title: string;
    description: string;
    version: string;
    tag?: string[];
}
