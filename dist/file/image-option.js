"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageOptions = void 0;
const imageFilter = (req, file, callback) => {
    if (!Boolean(file.mimetype.match(/(jpg|jpeg|png|gif)/)))
        callback(null, false);
    callback(null, true);
};
exports.imageOptions = {
    limits: { fileSize: 5242880 },
    fileFilter: imageFilter
};
//# sourceMappingURL=image-option.js.map