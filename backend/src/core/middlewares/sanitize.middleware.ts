import { Request, Response, NextFunction } from 'express';
import sanitizeHtml from 'sanitize-html';

export function sanitizeMiddleware(req: Request, res: Response, next: NextFunction) {
  if (req.body) {
    Object.keys(req.body).forEach((key) => {
      if (typeof req.body[key] === 'string') {
        req.body[key] = sanitizeHtml(req.body[key], {
          //   allowedTags: [],
          //   allowedAttributes: {},
          //   disallowedTagsMode: 'recursiveEscape',
        });
      }
    });
  }
  next();
}
