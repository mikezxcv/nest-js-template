import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';

@Injectable()
export class TaskService implements OnModuleInit {
  private readonly logger = new Logger(TaskService.name);
  private cronExpression: string = process.env.CRON_EXPRESSION || '* * * * * *';
  constructor(private scheduleRegistry: SchedulerRegistry) {}

  onModuleInit() {
    const job = new CronJob(this.cronExpression, () => {
     this.callToLog();
      // What you want to do here
    });

    this.scheduleRegistry.addCronJob('sendReport', job);
    job.start();
  }

  callToLog() {
    this.logger.debug('called: ', this.cronExpression);
  }

  //   @Cron('*/5 * * * * *')
  //   handleCron() {
  //     this.logger.debug(this.cronExpression);
  //     this.logger.debug('Called every second');
  //   }
}
