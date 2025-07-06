/*
  # Insert Sample Data

  1. Daily Tips
    - Insert comprehensive health tips for all categories and tiers
    
  2. Sample Health Data
    - No sample data for user-specific tables (will be created by users)
*/

-- Insert sample daily tips
INSERT INTO daily_tips (title, content, category, target_audience) VALUES
-- Free tier tips
('Stay Hydrated for Better Health', 'Drinking 8 glasses of water daily helps maintain optimal blood pressure and supports overall cardiovascular health. Start your day with a glass of water to kickstart your metabolism.', 'hydration', 'all'),
('The Power of Mediterranean Diet', 'Mediterranean diet rich in olive oil, fish, and vegetables can reduce heart disease risk by up to 30%. Try incorporating more leafy greens and nuts into your meals.', 'nutrition', 'all'),
('Morning Stretches for Energy', 'Just 10 minutes of morning stretches can improve circulation, reduce stiffness, and boost energy levels throughout the day. Focus on neck, shoulders, and back stretches.', 'exercise', 'all'),
('Quality Sleep for Recovery', 'Aim for 7-9 hours of quality sleep. Create a bedtime routine by avoiding screens 1 hour before bed and keeping your bedroom cool and dark for optimal rest.', 'sleep', 'all'),
('Mindful Breathing for Stress', 'Practice the 4-7-8 breathing technique: inhale for 4 counts, hold for 7, exhale for 8. This activates your parasympathetic nervous system and reduces stress hormones.', 'mental_health', 'all'),
('Walk After Meals', 'A 10-15 minute walk after meals can help regulate blood sugar levels and improve digestion. This simple habit can make a significant difference in your metabolic health.', 'exercise', 'all'),
('Eat the Rainbow', 'Include colorful fruits and vegetables in your diet. Different colors provide different antioxidants and nutrients that support various aspects of your health.', 'nutrition', 'all'),
('Practice Gratitude Daily', 'Writing down 3 things you''re grateful for each day can improve mental health, reduce stress, and enhance overall life satisfaction.', 'mental_health', 'all'),

-- Tier 1 (Pro) tips
('Omega-3 for Brain Health', 'Include fatty fish like salmon, walnuts, and flaxseeds in your diet. Omega-3 fatty acids support brain function and may help reduce inflammation in the body.', 'nutrition', 'tier1'),
('HIIT for Heart Health', 'High-Intensity Interval Training for just 15-20 minutes can improve cardiovascular health more effectively than steady-state cardio. Try 30 seconds work, 30 seconds rest.', 'exercise', 'tier1'),
('Intermittent Fasting Benefits', 'A 16:8 intermittent fasting schedule can help improve insulin sensitivity, support weight management, and may have anti-aging benefits.', 'nutrition', 'tier1'),
('Cold Shower Therapy', 'Ending your shower with 30 seconds of cold water can boost circulation, improve immune function, and increase alertness and energy levels.', 'general', 'tier1'),
('Magnesium for Better Sleep', 'Taking 200-400mg of magnesium glycinate before bed can improve sleep quality and help with muscle relaxation and recovery.', 'sleep', 'tier1'),
('Strength Training Benefits', 'Resistance training 2-3 times per week helps maintain bone density, muscle mass, and metabolic rate as you age. Start with bodyweight exercises.', 'exercise', 'tier1'),

-- Tier 2 (Pro+) tips
('Probiotics for Gut Health', 'A healthy gut microbiome supports immune function and mental health. Include fermented foods like yogurt, kefir, sauerkraut, and kimchi in your daily diet.', 'nutrition', 'tier2'),
('Advanced Sleep Optimization', 'Track your sleep cycles and aim to wake up during light sleep phases. Use blue light blocking glasses 2 hours before bed and maintain a consistent sleep schedule.', 'sleep', 'tier2'),
('Biohacking Your Nutrition', 'Consider nutrient timing: eat protein within 30 minutes post-workout, consume carbs around training, and include healthy fats with every meal for optimal absorption.', 'nutrition', 'tier2'),
('Heart Rate Variability Training', 'Monitor your HRV to optimize training and recovery. Higher HRV indicates better autonomic nervous system balance and readiness for physical stress.', 'exercise', 'tier2'),
('Advanced Stress Management', 'Combine meditation, breathwork, and cold exposure for comprehensive stress resilience. Practice box breathing (4-4-4-4) during stressful situations.', 'mental_health', 'tier2'),
('Circadian Rhythm Optimization', 'Get 10-15 minutes of morning sunlight within 1 hour of waking to regulate your circadian rhythm and improve sleep quality and energy levels.', 'sleep', 'tier2');