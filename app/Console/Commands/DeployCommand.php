<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class DeployCommand extends Command
{
    protected $signature = 'deploy';

    protected $description = 'Pull, commit, merge and push branches';

    public function handle()
    {
        $commands = [
            "git add .",
            'git commit -m "updated and modified some changes" || echo "No changes to commit."',
            "git push",
            "git checkout main",
            "git merge testing",
            "git push",
            "git checkout stable",
            "git merge main",
            "git push",
            "git checkout testing"
        ];


        foreach ($commands as $command) {
            $this->info("Running: {$command}");
            exec($command, $output, $result);

            if ($result !== 0) {
                $this->error("Command failed: {$command}");
                exit($result);
            }
        }

        $this->info("Deploy process completed successfully!");
    }
}
