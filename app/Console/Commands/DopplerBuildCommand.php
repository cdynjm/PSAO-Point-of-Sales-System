<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class DopplerBuildCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'run:build';

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
            'cmd /c "start doppler run -- npm run build"',
            'cmd /c "start doppler run -- php artisan serve"',
        ];

        foreach ($commands as $command) {
            $this->info("Running: {$command}");
            pclose(popen($command, "r"));
        }

        $this->info("All services started in background.");
    }
}
