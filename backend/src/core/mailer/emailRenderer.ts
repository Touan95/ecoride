import { promises } from 'fs';
import { resolve } from 'path';
import handlebars from 'handlebars';

const ENCODING = 'utf8';
const PARTIAL_NAME = 'layout';

const INTERNAL_TEMPLATE_PATH = resolve(__dirname, '../../static/templates/internal.template.hbs');
const PUBLIC_TEMPLATE_PATH = resolve(__dirname, '../../static/templates/public.template.hbs');

export interface DefaultParamsEmailRenderer {
  email: string;
  manageNotificationUrl?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TemplateParams = { [key: string]: any } & DefaultParamsEmailRenderer;

interface EmailRendererOptions {
  baseTemplate: 'internal' | 'public';
  subTemplatePath: string;
  params?: TemplateParams;
}

/**
 * Renders html code of email. Template is attached into base html code.
 * @param baseTemplate 'internal' or 'public'
 * @param subTemplatePath path of .hbs file
 * @param params params passed into template
 */
export async function emailRenderer({
  baseTemplate,
  subTemplatePath,
  params,
}: EmailRendererOptions): Promise<string> {
  const BASE_TEMPLATE_PATH =
    baseTemplate === 'internal' ? INTERNAL_TEMPLATE_PATH : PUBLIC_TEMPLATE_PATH;

  const baseSource = await promises.readFile(BASE_TEMPLATE_PATH, ENCODING);
  const templateSource = await promises.readFile(subTemplatePath, ENCODING);

  handlebars.registerPartial(PARTIAL_NAME, templateSource);

  const template = handlebars.compile(baseSource);
  const htmlTemplate = template(params);

  handlebars.unregisterPartial(PARTIAL_NAME);

  return htmlTemplate;
}
