<script lang="ts">
    import { Button } from '$lib/components/ui/button';
    import { Input } from '$lib/components/ui/input';
</script>

<div class="w-full max-w-none py-24 px-6 sm:px-12 mx-auto">
    <h1 class="text-3xl font-bold mb-8">Contact Us</h1>
    
    <form class="space-y-6">
        <div class="space-y-2">
            <label for="name" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Name</label>
            <Input id="name" placeholder="John Doe" />
        </div>
        
        <div class="space-y-2">
            <label for="email" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Email</label>
            <Input id="email" type="email" placeholder="john@example.com" />
        </div>

        <div class="space-y-2">
             <label for="message" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Message</label>
             <textarea 
                id="message" 
                class="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="How can we help?"></textarea>
        </div>

        <Button type="submit" class="w-full">Send Message</Button>
    </form>
</div>
