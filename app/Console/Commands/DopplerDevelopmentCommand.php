<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class DopplerDevelopmentCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'run:dev';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Running on server';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $commands = [
            'cmd /c "start doppler run -- php artisan serve"',
            'cmd /c "start doppler run -- npm run dev"'
        ];

        foreach ($commands as $command) {
            $this->info("Running: {$command}");
            pclose(popen($command, "r"));
        }

        $this->info("All services started in background.");
    }
}


