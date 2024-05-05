import { ArgumentsHost, Catch, HttpStatus, Logger } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
    private readonly logger = new Logger(PrismaClientExceptionFilter.name);

    private readonly prismaErrorCodes = {
        P2000: HttpStatus.BAD_REQUEST,
        P2002: HttpStatus.CONFLICT,
        P2025: HttpStatus.NOT_FOUND,
    };

    catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
        this.logger.error(exception.message);

        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const message = this.defaultExceptionMessage(exception);

        const exceptionCode = exception.code;

        if (Object.keys(this.prismaErrorCodes).includes(exceptionCode)) {
            const statusCode = this.prismaErrorCodes[exceptionCode as keyof typeof this.prismaErrorCodes];

            response.status(statusCode).json({
                message,
                statusCode,
            });
        } else {
            // default 500 error code
            super.catch(exception, host);
        }
    }

    private defaultExceptionMessage(exception: Prisma.PrismaClientKnownRequestError): string {
        const shortMessage = exception.message.substring(exception.message.indexOf('→'));
        return `[${exception.code}]: ` + shortMessage.substring(shortMessage.indexOf('\n')).replace(/\n/g, '').trim();
    }
}
